import supabase, { supabaseUrl } from "./supabase";
import type { Cabin, FilterOption, SortOption, CabinFormData } from "../types";

interface GetCabinsOptions {
  filter?: FilterOption;
  sortBy?: SortOption;
}

export const getCabins = async ({ filter, sortBy }: GetCabinsOptions = {}): Promise<Cabin[]> => {
  let query = supabase.from("cabins").select("*");

  if (filter) {
    if (filter.value === "no-discount") {
      query = query.eq("discount", 0);
    } else if (filter.value === "discount") {
      query = query.gt("discount", 0);
    } else {
      const method = filter.method || "eq";
      if (method === "eq") {
        query = query.eq(filter.filterField, filter.value);
      } else if (method === "gte") {
        query = query.gte(filter.filterField, filter.value);
      } else if (method === "lte") {
        query = query.lte(filter.filterField, filter.value);
      }
    }
  }

  if (sortBy) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  }

  const { data, error } = await query;

  if (error) {
    throw new Error("Cabins could not be loaded");
  }

  return data;
};

export const deleteCabinApi = async (id: number): Promise<void> => {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error("Delete cabin error:", error);
    throw new Error(error.message || "Cabins could not be deleted");
  }
};

export const createEditCabinApi = async (newCabin: CabinFormData, id?: number) => {
  const hasImagePath = typeof newCabin.image === 'string' && newCabin.image.startsWith(supabaseUrl);

  const imageName = `${Math.random()}-${typeof newCabin.image !== 'string' ? newCabin.image.name : 'image'}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query;

  if (!id) {
    query = supabase.from("cabins").insert([{ ...newCabin, image: imagePath }]).select().single();
  } else {
    query = supabase.from("cabins")
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select()
      .single();
  }

  const { data, error } = await query;

  if (error) {
    throw new Error("Cabins could not be created");
  }

  if (hasImagePath) return data;

  const { error: dataStorageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (dataStorageError) {
    await supabase.from("cabins").delete().eq("id", newCabin.id);
    throw new Error(
      "Cabins could not be uploaded and the cabin was not created"
    );
  }

  return data;
};

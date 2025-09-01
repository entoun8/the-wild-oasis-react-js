import supabase, { supabaseUrl } from "./supabase";

export const getCabins = async ({ filter, sortBy } = {}) => {
  let query = supabase.from("cabins").select("*");

  if (filter) {
    if (filter.value === "no-discount") {
      query = query.eq("discount", 0);
    } else if (filter.value === "discount") {
      query = query.gt("discount", 0);
    } else {
      query = query[filter.method || "eq"](filter.filterField, filter.value);
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

export const deleteCabinApi = async (id) => {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    throw new Error("Cabins could not be deleted");
  }
};

export const createEditCabinApi = async (newCabin, id) => {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  if (id) {
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();
  }

  const { data, error } = await query.select().single();

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

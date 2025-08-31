import supabase from "./supabase";

export const signup = async ({ email, password, fullName }) => {
  let { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
};

export const login = async ({ email, password }) => {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) throw new Error(error.message);

  return data;
};

export const logout = async () => {
  let { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
};

export const getCurrentUser = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return null;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return user;
};

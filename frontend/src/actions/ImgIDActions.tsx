export const save_ID = (id: any) => {
  console.log(id);
  return {
    type: "SAVE_ID",
    payload: id,
  };
};

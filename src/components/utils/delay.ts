export const delay = async (
  ms: number = 2000,
  hardReload: boolean = false,
): Promise<void> => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
      if (hardReload) {
        if (typeof window !== undefined) {
          window.location.reload();
        }
      }
    }, ms);
  });
};



export const mockConnect = jest.fn(async (app: { emit: (arg0: string) => void; }) => {
  return app.emit("ready");
});
interface Providers {
  children: React.ReactNode;
}

export const Providers = ({ children }: Providers) => {
  return (
    <div className="min-h-screen bg-gradient-to-bl from-indigo-500 via-purple-500 to-pink-500">
      {children}
    </div>
  );
};

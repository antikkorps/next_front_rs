type Props = {
  children: React.ReactNode;
};

export default function Layout({
  children
}: Props) {

    return (
        <div className="flex min-h-screen flex-1 flex-col justify-center items-center px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm border px-10 py-4 rounded-xl shadow-sm bg-white/90 dark:bg-background">
                {children}
            </div>
        </div>
    )
}

export default function SignUpLayout({
    children,
} : {
    children: React.ReactNode;
}) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        {children}
      </div>
    )
}
import type { ReactNode } from "react"

interface PageLayoutProps {
  children: ReactNode
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl" | "full"
  className?: string
}

const PageLayout = ({ children, maxWidth = "4xl", className = "" }: PageLayoutProps) => {
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "4xl": "max-w-4xl",
    full: "max-w-full"
  }

  return (
    <div className={`mx-auto w-full ${maxWidthClasses[maxWidth]} px-4 ${className}`}>
      {children}
    </div>
  )
}

export default PageLayout

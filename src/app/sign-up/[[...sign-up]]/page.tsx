import { SignUp } from '@clerk/nextjs'

export default function Page() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 z-0 bg-grid-pattern opacity-20 pointer-events-none" />

            <div className="z-10">
                <SignUp
                    appearance={{
                        elements: {
                            formButtonPrimary: 'bg-primary hover:bg-primary/90 text-primary-foreground',
                            card: 'bg-card border border-border shadow-xl',
                            headerTitle: 'text-foreground',
                            headerSubtitle: 'text-muted-foreground',
                            socialButtonsBlockButton: 'bg-white text-black border-gray-200 hover:bg-gray-50',
                            dividerBase: 'bg-border',
                            footerActionLink: 'text-primary hover:text-primary/90'
                        }
                    }}
                />
            </div>
        </div>
    )
}

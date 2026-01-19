import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FormProvider } from "@/context/FormContext";

export default function EnrollLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Student Enrollment <ThemeToggle /></h1>
                {/* Wrap everything in the Provider so all steps can access state */}

                <FormProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}
                    </ThemeProvider>
                </FormProvider>
            </div>
        </div>
    );
}
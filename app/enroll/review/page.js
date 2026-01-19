"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormContext } from "@/context/FormContext";
import ProgressBar from "@/components/ProgressBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { Check, PenSquare } from "lucide-react"; // Optional: styling icons

// Helper component to display a section with an Edit link
const ReviewSection = ({ title, editPath, data }) => (
  <Card className="shadow-none border-gray-200 bg-gray-50/50 mb-4 overflow-hidden">
    <CardHeader className="flex flex-row items-center justify-between py-3 px-4 bg-gray-100/50 border-b border-gray-100">
      <CardTitle className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
        {title}
      </CardTitle>
      <Link 
        href={editPath} 
        className="text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1 hover:underline transition-all"
      >
        Edit <PenSquare className="w-3 h-3" />
      </Link>
    </CardHeader>
    <CardContent className="p-4 text-sm space-y-3">
      {Object.entries(data).map(([key, value]) => {
        // Skip null/empty values or long objects for cleaner display
        if (!value || typeof value === 'object') return null;
        return (
          <div key={key} className="flex justify-between items-start gap-4">
            <span className="text-gray-500 capitalize min-w-[100px] shrink-0">
              {key.replace(/([A-Z])/g, ' $1').trim()}:
            </span>
            <span className="font-medium text-gray-900 text-right break-words flex-1">
              {value.toString()}
            </span>
          </div>
        )
      })}
    </CardContent>
  </Card>
);

export default function ReviewStep() {
  const { formData } = useFormContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API delay 
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Log payload to console
    console.log("FINAL SUBMISSION PAYLOAD:", JSON.stringify(formData, null, 2));
    
    setSuccess(true);
    setIsSubmitting(false);
    
    // Clear storage on success
    localStorage.removeItem("enrollmentFormData");
  };

  if (success) {
    return (
      <div className="min-h-screen  flex items-center justify-center p-4">
        <div className="w-full max-w-md  p-8 rounded-xl shadow-lg border border-gray-100 text-center space-y-6 animate-in zoom-in-95 duration-300">
           <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
             <Check className="w-8 h-8" />
           </div>
           
           <div>
             <h2 className="text-2xl font-bold ">Registration Complete!</h2>
             <p className="text-gray-500 mt-2">
               Thank you for enrolling. We have received your details.
             </p>
           </div>

           <Alert className="bg-green-50 border-green-200 text-left">
              <AlertTitle className="text-green-800 font-bold">System Status</AlertTitle>
              <AlertDescription className="text-green-700 text-xs mt-1">
                Payload logged to console successfully.
              </AlertDescription>
           </Alert>

           <Button 
             onClick={() => window.location.href = '/enroll/step-1'} 
             className="w-full h-11 bg-blue-500"
           >
             Start New Form
           </Button>
        </div>
      </div>
    );
  }

  return (
    // 1. Page Container
    <div className="min-h-screen  flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      
      {/* 2. Main Wrapper */}
      <div className="w-full max-w-xl space-y-6">
        
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 space-y-6">
          <ProgressBar step={4} />

          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Review & Submit</h2>
            <p className="text-sm text-gray-500 mt-2">
              Please double-check your information before confirming.
            </p>
          </div>
          
          <div className="space-y-4">
            <ReviewSection 
              title="Student Details" 
              editPath="/enroll/step-1" 
              data={{
                Name: formData.fullName, 
                Email: formData.email, 
                Mobile: formData.mobile, 
                Class: formData.studentClass
              }} 
            />
            
            <ReviewSection 
              title="Academic Details" 
              editPath="/enroll/step-2" 
              data={{
                Subjects: formData.subjects?.join(", "), 
                Goal: formData.examGoal, 
                "Study Hours": formData.studyHours,
                "Scholarship": formData.hasScholarship ? "Yes" : "No"
              }} 
            />
            
            <ReviewSection 
              title="Address & Guardian" 
              editPath="/enroll/step-3" 
              data={{
                Address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pinCode}`,
                "Guardian": formData.guardianName,
                "Payment": `${formData.paymentPlan} (${formData.paymentMode})`
              }} 
            />
          </div>

          <Button 
            onClick={handleFinalSubmit} 
            disabled={isSubmitting} 
            className="w-full h-11 bg-green-600 hover:bg-green-700 text-white font-semibold shadow-sm transition-all"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Submitting...
              </span>
            ) : "Confirm & Submit Enrollment"}
          </Button>

        </div>
      </div>
    </div>
  );
}
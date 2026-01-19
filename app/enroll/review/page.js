"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormContext } from "@/context/FormContext";
import ProgressBar from "@/components/ProgressBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";

// Helper component to display a section with an Edit link
const ReviewSection = ({ title, editPath, data }) => (
  <Card className="mb-4">
    <CardHeader className="flex flex-row items-center justify-between py-4">
      <CardTitle className="text-base font-bold">{title}</CardTitle>
      <Link href={editPath} className="text-sm text-blue-600 hover:underline">Edit</Link>
    </CardHeader>
    <CardContent className="text-sm space-y-1 pb-4">
      {Object.entries(data).map(([key, value]) => {
        // Skip null/empty values or long objects for cleaner display
        if (!value || typeof value === 'object') return null;
        return (
           <div key={key} className="flex justify-between">
             <span className="text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
             <span className="font-medium">{value.toString()}</span>
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
    
    // Log payload to console [cite: 72]
    console.log("FINAL SUBMISSION PAYLOAD:", JSON.stringify(formData, null, 2));
    
    setSuccess(true);
    setIsSubmitting(false);
    
    // Clear storage on success (optional but good practice)
    localStorage.removeItem("enrollmentFormData");
  };

  if (success) {
    return (
      <div className="text-center space-y-4">
        <Alert className="bg-green-50 border-green-200">
           <AlertTitle className="text-green-800 font-bold text-lg">Success!</AlertTitle>
           <AlertDescription className="text-green-700">
             Your enrollment has been submitted. Check the console for the JSON payload.
           </AlertDescription>
        </Alert>
        <Button onClick={() => window.location.href = '/enroll/step-1'}>Start New Form</Button>
      </div>
    );
  }

  return (
    <div>
      <ProgressBar step={4} />
      <h2 className="text-xl font-semibold mb-4">Review & Submit</h2>
      
      {/* Break down data by step logic */}
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

      <Button 
        onClick={handleFinalSubmit} 
        disabled={isSubmitting} 
        className="w-full bg-green-600 hover:bg-green-700 mt-4"
      >
        {isSubmitting ? "Submitting..." : "Confirm & Submit"}
      </Button>
    </div>
  );
}
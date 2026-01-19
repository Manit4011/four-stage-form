"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useFormContext } from "@/context/FormContext";
import { createStep2Schema } from "@/schemas/step2Schema";
import ProgressBar from "@/components/ProgressBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Dynamic subjects based on class
const SUBJECTS_BY_CLASS = {
  "9": ["Math", "Science", "English", "Social Science", "Hindi"],
  "10": ["Math", "Science", "English", "Social Science", "Hindi"],
  "11": ["Physics", "Chemistry", "Math", "Biology", "English", "Computer Science"],
  "12": ["Physics", "Chemistry", "Math", "Biology", "English", "Computer Science"],
};

export default function Step2() {
  const router = useRouter();
  const { formData, updateFormData, isLoaded } = useFormContext();
  
  // Guard: Redirect if Step 1 is missing
  useEffect(() => {
    if (isLoaded && !formData.fullName) {
      router.push("/enroll/step-1");
    }
  }, [isLoaded, formData, router]);

  const schema = createStep2Schema(formData.studentClass || "10");

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      subjects: [],
      hasScholarship: false,
      ...formData 
    }
  });

  const hasScholarship = watch("hasScholarship");
  const selectedSubjects = watch("subjects") || [];

  const onSubmit = (data) => {
    updateFormData(data);
    router.push("/enroll/step-3");
  };

  const handleSubjectChange = (subject, isChecked) => {
    const current = selectedSubjects;
    if (isChecked) {
      setValue("subjects", [...current, subject]);
    } else {
      setValue("subjects", current.filter((s) => s !== subject));
    }
  };

  if (!isLoaded) return null; 

  return (
    // 1. Page Container
    <div className="min-h-screen  flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      
      {/* 2. Card Container */}
      <div className="w-full max-w-lg space-y-6  p-8 rounded-xl shadow-lg border border-gray-100">
        
        <div className="mb-6">
          <ProgressBar step={2} />
        </div>

        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight ">Academic Details</h2>
          <p className="text-sm text-gray-500 mt-2">
            Customize your learning path and goals.
          </p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Subjects - Styled as a Grid of Cards */}
          <div className="space-y-3">
            <Label className="text-base font-medium text-gray-500">
              Subjects (Class {formData.studentClass})
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {(SUBJECTS_BY_CLASS[formData.studentClass] || []).map((sub) => (
                <div 
                  key={sub} 
                  className={`flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3 shadow-sm transition-colors ${
                    selectedSubjects.includes(sub) ? "border-white" : "border-black"
                  }`}
                >
                  <Checkbox 
                    id={sub} 
                    checked={selectedSubjects.includes(sub)}
                    onCheckedChange={(checked) => handleSubjectChange(sub, checked)}
                  />
                  <Label htmlFor={sub} className="font-normal cursor-pointer w-full text-sm leading-none pt-0.5">
                    {sub}
                  </Label>
                </div>
              ))}
            </div>
            {errors.subjects && <p className="text-red-500 text-xs font-medium mt-1">{errors.subjects.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Exam Goal */}
            <div className="space-y-1.5">
              <Label className="text-gray-500">Exam Goal</Label>
              <Select onValueChange={(v) => setValue("examGoal", v)} defaultValue={formData.examGoal}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select Goal" />
                </SelectTrigger>
                <SelectContent>
                  {["Board Excellence", "Concept Mastery", "Competitive Prep"].map(g => (
                    <SelectItem key={g} value={g}>{g}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.examGoal && <p className="text-red-500 text-xs font-medium mt-1">{errors.examGoal.message}</p>}
            </div>

            {/* Study Hours */}
            <div className="space-y-1.5">
              <Label className="text-gray-500">Weekly Hours</Label>
              <Input 
                type="number" 
                {...register("studyHours")} 
                className="h-10"
                placeholder="e.g. 15"
              />
              {errors.studyHours && <p className="text-red-500 text-xs font-medium mt-1">{errors.studyHours.message}</p>}
            </div>
          </div>

          {/* Scholarship Toggle - Styled as a Highlighted Box */}
          <div className="space-y-4">
            <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
               <Checkbox 
                 id="scholarship" 
                 checked={hasScholarship} 
                 onCheckedChange={(c) => setValue("hasScholarship", c)} 
               />
               <div className="space-y-1 leading-none">
                 <Label htmlFor="scholarship" className="cursor-pointer">
                   Apply for Scholarship?
                 </Label>
                 <p className="text-sm text-gray-500">
                   Check this if you wish to apply for financial aid or merit scholarships.
                 </p>
               </div>
            </div>

            {/* Conditional Fields with Animation effect */}
            {hasScholarship && (
              <div className="bg-blue-50/50 p-5 rounded-lg border border-blue-100 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="space-y-1.5">
                    <Label className="text-gray-500">Last Exam Percentage</Label>
                    <Input 
                      type="number" 
                      {...register("lastExamScore")} 
                      placeholder="e.g. 85" 
                      className="bg-white h-10"
                    />
                    {errors.lastExamScore && <p className="text-red-500 text-xs font-medium mt-1">{errors.lastExamScore.message}</p>}
                  </div>
                  
                  <div className="space-y-1.5">
                    <Label className="text-gray-500">Achievements (Optional)</Label>
                    <Textarea 
                      {...register("achievements")} 
                      placeholder="List any academic awards or competition wins..." 
                      className="bg-white min-h-[80px]"
                    />
                  </div>
              </div>
            )}
          </div>

          <div className="flex gap-4 pt-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => router.back()}
              className="w-1/3 h-11"
            >
              Back
            </Button>
            <Button 
              type="submit" 
              className="flex-1 h-11"
            >
              Next: Address
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
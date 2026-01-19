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
  
  // Guard: Redirect if Step 1 is missing (prevents jumping ahead) [cite: 26]
  useEffect(() => {
    if (isLoaded && !formData.fullName) {
      router.push("/enroll/step-1");
    }
  }, [isLoaded, formData, router]);

  // Create schema dynamically using the class from Step 1
  const schema = createStep2Schema(formData.studentClass || "10");

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      subjects: [],
      hasScholarship: false,
      ...formData // Load saved data
    }
  });

  // Watch for conditional rendering
  const hasScholarship = watch("hasScholarship");
  const selectedSubjects = watch("subjects") || [];

  const onSubmit = (data) => {
    updateFormData(data);
    router.push("/enroll/step-3");
  };

  // Helper to handle Checkbox array logic
  const handleSubjectChange = (subject, isChecked) => {
    const current = selectedSubjects;
    if (isChecked) {
      setValue("subjects", [...current, subject]);
    } else {
      setValue("subjects", current.filter((s) => s !== subject));
    }
  };

  if (!isLoaded) return null; // Avoid flash of content

  return (
    <div>
      <ProgressBar step={2} />
      <h2 className="text-xl font-semibold mb-4">Academic Details</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Subjects - Dynamic List */}
        <div>
          <Label className="mb-2 block">Subjects (Class {formData.studentClass})</Label>
          <div className="grid grid-cols-2 gap-2">
            {(SUBJECTS_BY_CLASS[formData.studentClass] || []).map((sub) => (
              <div key={sub} className="flex items-center space-x-2">
                <Checkbox 
                  id={sub} 
                  checked={selectedSubjects.includes(sub)}
                  onCheckedChange={(checked) => handleSubjectChange(sub, checked)}
                />
                <label htmlFor={sub} className="text-sm">{sub}</label>
              </div>
            ))}
          </div>
          {errors.subjects && <p className="text-red-500 text-sm mt-1">{errors.subjects.message}</p>}
        </div>

        {/* Exam Goal */}
        <div>
          <Label>Exam Goal</Label>
          <Select onValueChange={(v) => setValue("examGoal", v)} defaultValue={formData.examGoal}>
            <SelectTrigger><SelectValue placeholder="Select Goal" /></SelectTrigger>
            <SelectContent>
              {["Board Excellence", "Concept Mastery", "Competitive Prep"].map(g => (
                <SelectItem key={g} value={g}>{g}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.examGoal && <p className="text-red-500 text-sm">{errors.examGoal.message}</p>}
        </div>

        {/* Study Hours */}
        <div>
          <Label>Weekly Study Hours</Label>
          <Input type="number" {...register("studyHours")} />
          {errors.studyHours && <p className="text-red-500 text-sm">{errors.studyHours.message}</p>}
        </div>

        {/* Scholarship Toggle */}
        <div className="flex items-center space-x-2 border p-3 rounded-md">
           <Checkbox 
             id="scholarship" 
             checked={hasScholarship} 
             onCheckedChange={(c) => setValue("hasScholarship", c)} 
           />
           <Label htmlFor="scholarship">Applying for Scholarship?</Label>
        </div>

        {/* Conditional Fields [cite: 45] */}
        {hasScholarship && (
          <div className="bg-blue-50 p-4 rounded-md space-y-4 border border-blue-100">
             <div>
               <Label>Last Exam Percentage</Label>
               <Input type="number" {...register("lastExamScore")} placeholder="0-100" />
               {errors.lastExamScore && <p className="text-red-500 text-sm">{errors.lastExamScore.message}</p>}
             </div>
             <div>
               <Label>Achievements (Optional)</Label>
               <Textarea {...register("achievements")} placeholder="List any awards..." />
             </div>
          </div>
        )}

        <div className="flex gap-3">
          <Button type="button" variant="outline" onClick={() => router.back()}>Back</Button>
          <Button type="submit" className="flex-1">Next: Address</Button>
        </div>
      </form>
    </div>
  );
}
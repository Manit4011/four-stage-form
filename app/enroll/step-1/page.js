"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useFormContext } from "@/context/FormContext";
import { step1Schema } from "@/schemas/step1Schema";
import ProgressBar from "@/components/ProgressBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function Step1() {
  const router = useRouter();
  const { formData, updateFormData } = useFormContext();

  // Initialize form with Zod resolver and default values from Context
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: zodResolver(step1Schema),
    defaultValues: formData // Pre-fill if user comes back
  });

  // Manually set values for Select components (since they don't use native inputs)
  useEffect(() => {
    if (formData.studentClass) setValue("studentClass", formData.studentClass);
    if (formData.board) setValue("board", formData.board);
    if (formData.language) setValue("language", formData.language);
  }, [formData, setValue]);

  const onSubmit = (data) => {
    updateFormData(data); // Save to Context
    router.push("/enroll/step-2"); // Navigate to Next
  };

  return (
    <div>
      <ProgressBar step={1} />
      <h2 className="text-xl font-semibold mb-4">Student Details</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        {/* Full Name */}
        <div>
          <Label>Full Name</Label>
          <Input {...register("fullName")} placeholder="John Doe" />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
        </div>

        {/* Email */}
        <div>
          <Label>Email</Label>
          <Input {...register("email")} placeholder="john@example.com" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Mobile */}
        <div>
          <Label>Mobile Number</Label>
          <div className="flex items-center">
            <span className="bg-gray-100 border border-r-0 px-3 py-2 rounded-l-md text-sm">+91</span>
            <Input {...register("mobile")} className="rounded-l-none" placeholder="9876543210" />
          </div>
          {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>}
        </div>

        {/* Class Selection */}
        <div>
          <Label>Class</Label>
          <Select onValueChange={(val) => setValue("studentClass", val)} defaultValue={formData.studentClass}>
            <SelectTrigger><SelectValue placeholder="Select Class" /></SelectTrigger>
            <SelectContent>
              {["9", "10", "11", "12"].map((c) => <SelectItem key={c} value={c}>Class {c}</SelectItem>)}
            </SelectContent>
          </Select>
          {errors.studentClass && <p className="text-red-500 text-sm">{errors.studentClass.message}</p>}
        </div>

        {/* Board & Language (Simplified for brevity, similar structure to Class) */}
        <div className="grid grid-cols-2 gap-4">
           <div>
            <Label>Board</Label>
            <Select onValueChange={(val) => setValue("board", val)} defaultValue={formData.board}>
              <SelectTrigger><SelectValue placeholder="Select Board" /></SelectTrigger>
              <SelectContent>
                {["CBSE", "ICSE", "State Board"].map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
              </SelectContent>
            </Select>
            {errors.board && <p className="text-red-500 text-sm">{errors.board.message}</p>}
           </div>

           <div>
            <Label>Language</Label>
            <Select onValueChange={(val) => setValue("language", val)} defaultValue={formData.language}>
              <SelectTrigger><SelectValue placeholder="Preferred Language" /></SelectTrigger>
              <SelectContent>
                {["English", "Hindi", "Hinglish"].map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
              </SelectContent>
            </Select>
            {errors.language && <p className="text-red-500 text-sm">{errors.language.message}</p>}
           </div>
        </div>

        <Button type="submit" className="w-full">Next: Academic Details</Button>
      </form>
    </div>
  );
}
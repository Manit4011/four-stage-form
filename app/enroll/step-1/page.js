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

  // Manually set values for Select components
  useEffect(() => {
    if (formData.studentClass) setValue("studentClass", formData.studentClass);
    if (formData.board) setValue("board", formData.board);
    if (formData.language) setValue("language", formData.language);
  }, [formData, setValue]);

  const onSubmit = (data) => {
    updateFormData(data); 
    router.push("/enroll/step-2");
  };

  return (
    // 1. Page Container: Centers content, adds light gray bg
    <div className="min-h-screen  flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      
      {/* 2. Card Container: White background, shadow, rounded corners, max-width */}
      <div className="w-full max-w-lg space-y-6  p-8 rounded-xl shadow-lg border border-gray-100">
        
        {/* Progress Bar Wrapper */}
        <div className="mb-6">
          <ProgressBar step={1} />
        </div>

        {/* Header Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight ">
            Student Details
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Please enter your personal and academic information.
          </p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
          {/* Full Name */}
          <div className="space-y-1.5">
            <Label htmlFor="fullName" className="text-gray-700">Full Name</Label>
            <Input 
              id="fullName"
              {...register("fullName")} 
              placeholder="John Doe" 
              className="h-10" // Explicit height for consistency
            />
            {errors.fullName && <p className="text-red-500 text-xs font-medium mt-1">{errors.fullName.message}</p>}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-gray-700">Email Address</Label>
            <Input 
              id="email"
              {...register("email")} 
              placeholder="john@example.com" 
              className="h-10"
            />
            {errors.email && <p className="text-red-500 text-xs font-medium mt-1">{errors.email.message}</p>}
          </div>

          {/* Mobile */}
          <div className="space-y-1.5">
            <Label htmlFor="mobile" className="text-gray-700">Mobile Number</Label>
            <div className="flex items-center">
              {/* Prefix Stylization */}
              <span className="flex items-center justify-center bg-gray-100 border border-input border-r-0 px-3 h-10 rounded-l-md text-sm text-gray-500 font-medium">
                +91
              </span>
              <Input 
                id="mobile"
                {...register("mobile")} 
                className="rounded-l-none h-10 focus-visible:ring-0 focus-visible:ring-offset-0 relative z-10" 
                placeholder="9876543210" 
              />
            </div>
            {errors.mobile && <p className="text-red-500 text-xs font-medium mt-1">{errors.mobile.message}</p>}
          </div>

          {/* Class Selection */}
          <div className="space-y-1.5">
            <Label className="text-gray-700">Class</Label>
            <Select onValueChange={(val) => setValue("studentClass", val)} defaultValue={formData.studentClass}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                {["9", "10", "11", "12"].map((c) => (
                  <SelectItem key={c} value={c}>Class {c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.studentClass && <p className="text-red-500 text-xs font-medium mt-1">{errors.studentClass.message}</p>}
          </div>

          {/* Board & Language Grid */}
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-1.5">
              <Label className="text-gray-700">Board</Label>
              <Select onValueChange={(val) => setValue("board", val)} defaultValue={formData.board}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select Board" />
                </SelectTrigger>
                <SelectContent>
                  {["CBSE", "ICSE", "State Board"].map((b) => (
                    <SelectItem key={b} value={b}>{b}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.board && <p className="text-red-500 text-xs font-medium mt-1">{errors.board.message}</p>}
             </div>

             <div className="space-y-1.5">
              <Label className="text-gray-700">Language</Label>
              <Select onValueChange={(val) => setValue("language", val)} defaultValue={formData.language}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  {["English", "Hindi", "Hinglish"].map((l) => (
                    <SelectItem key={l} value={l}>{l}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.language && <p className="text-red-500 text-xs font-medium mt-1">{errors.language.message}</p>}
             </div>
          </div>

          <Button type="submit" className="w-full h-11 text-base font-medium mt-2">
            Next: Academic Details
          </Button>
        </form>
      </div>
    </div>
  );
}
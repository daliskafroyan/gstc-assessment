"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { cn } from "@/lib/utils";

type AssessmentStatus = "Accredited" | "Applicant";
type TechnicalScope =
	| "GSTC Hotel Criteria"
	| "GSTC Tour Operator Criteria"
	| "GSTC Destination Criteria";

interface Assessment {
	id: string;
	date: string;
	technicalScope: string[];
	status: AssessmentStatus;
	cbName: string;
	assessmentNumber: string;
}

const formSchema = z.object({
	cbName: z.string(),
	cbAddress: z.string(),
	cbHeadquarters: z.string(),
	affiliateOffices: z.string(),
	website: z.string(),
	cbMainContact: z.string(),
	cbStatus: z.enum(["Accredited", "Applicant"]),
	accreditationDate: z.string(),
	surveillanceEndDate: z.string(),
	referenceStandard: z.enum(["GSTC Criteria", "GSTC-Recognized Standard"]),
	technicalScope: z.array(z.string()).min(1),
	geographicalScope: z.string(),
	assessmentNumber: z.string(),
	applicableStandards: z.string(),
	timeframe: z.enum(["Short notice", "Normal", "Unannounced"]),
	type: z.array(z.string()),
	technique: z.array(z.string()),
	planning: z.enum(["Regular", "Extra"]),
	assessmentPurpose: z.string(),
});

function AssessmentForm({
	onSubmit,
	onClose,
}: {
	onSubmit: (data: z.infer<typeof formSchema>) => void;
	onClose: () => void;
}) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			technicalScope: [],
			type: [],
			technique: [],
			cbName: "",
			cbAddress: "",
			// ... other default values
		},
	});

	const handleSubmit = (values: z.infer<typeof formSchema>) => {
		onSubmit(values);
		onClose(); // Close the dialog after submission
		form.reset(); // Reset form
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
				{/* Title Box */}
				<div className="bg-slate-100 p-3 top-0 z-10">
					<h2 className="text-lg font-semibold text-center">
						Certification Body (CB) Information
					</h2>
				</div>

				{/* Form Content */}
				<div className="border rounded-md p-6">
					<div className="space-y-4">
						{/* CB Name */}
						<FormField
							control={form.control}
							name="cbName"
							render={({ field }) => (
								<FormItem className="grid grid-cols-[200px,1fr] items-center gap-4">
									<FormLabel className="text-left">CB Name</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						{/* Address */}
						<FormField
							control={form.control}
							name="cbAddress"
							render={({ field }) => (
								<FormItem className="grid grid-cols-[200px,1fr] items-center gap-4">
									<FormLabel className="text-left">Address</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						{/* CB Headquarters */}
						<FormField
							control={form.control}
							name="cbHeadquarters"
							render={({ field }) => (
								<FormItem className="grid grid-cols-[200px,1fr] items-center gap-4">
									<FormLabel className="text-left">CB Headquarters</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						{/* Affiliate Office(s) */}
						<FormField
							control={form.control}
							name="affiliateOffices"
							render={({ field }) => (
								<FormItem className="grid grid-cols-[200px,1fr] items-center gap-4">
									<FormLabel className="text-left">
										Affiliate Office(s)
									</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						{/* Website */}
						<FormField
							control={form.control}
							name="website"
							render={({ field }) => (
								<FormItem className="grid grid-cols-[200px,1fr] items-center gap-4">
									<FormLabel className="text-left">Website</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						{/* CB Main Contact */}
						<FormField
							control={form.control}
							name="cbMainContact"
							render={({ field }) => (
								<FormItem className="grid grid-cols-[200px,1fr] items-center gap-4">
									<FormLabel className="text-left">CB Main Contact</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
					</div>
				</div>

				{/* Second Section Title */}
				<div className="bg-slate-100 p-2 top-14 z-10">
					<h3 className="text-md font-semibold text-center">
						GSTC Accreditation Status
					</h3>
				</div>

				{/* Second Section Content */}
				<div className="border rounded-md p-6">
					<div className="space-y-4">
						{/* CB Status */}
						<FormField
							control={form.control}
							name="cbStatus"
							render={({ field }) => (
								<FormItem className="grid grid-cols-[200px,1fr] items-start gap-4">
									<FormLabel className="text-left pt-2">CB Status</FormLabel>
									<div className="space-y-2">
										<RadioGroup
											onValueChange={field.onChange}
											defaultValue={field.value}
											className="flex flex-col space-y-1"
										>
											<div className="flex items-center space-x-2">
												<RadioGroupItem value="Accredited" id="accredited" />
												<Label htmlFor="accredited">Accredited</Label>
											</div>
											<div className="flex items-center space-x-2">
												<RadioGroupItem value="Applicant" id="applicant" />
												<Label htmlFor="applicant">Applicant</Label>
											</div>
										</RadioGroup>
									</div>
								</FormItem>
							)}
						/>

						{/* Accreditation Approval Decision Date */}
						<FormField
							control={form.control}
							name="accreditationDate"
							render={({ field }) => (
								<FormItem className="grid grid-cols-[200px,1fr] items-center gap-4">
									<FormLabel className="text-left">
										Accreditation Approval Decision Date
									</FormLabel>
									<FormControl>
										<Input type="date" {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						{/* Current Surveillance Cycle End Date */}
						<FormField
							control={form.control}
							name="surveillanceEndDate"
							render={({ field }) => (
								<FormItem className="grid grid-cols-[200px,1fr] items-center gap-4">
									<FormLabel className="text-left">
										Current Surveillance Cycle End Date
									</FormLabel>
									<FormControl>
										<Input type="date" {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						{/* Geographical Scope */}
						<FormField
							control={form.control}
							name="geographicalScope"
							render={({ field }) => (
								<FormItem className="grid grid-cols-[200px,1fr] items-center gap-4">
									<FormLabel className="text-left">
										Geographical Scope
									</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						{/* Reference Standard */}
						<FormField
							control={form.control}
							name="referenceStandard"
							render={({ field }) => (
								<FormItem className="grid grid-cols-[200px,1fr] items-start gap-4">
									<FormLabel className="text-left pt-2">
										Reference Standard for Certification
									</FormLabel>
									<div className="space-y-2">
										<RadioGroup
											onValueChange={field.onChange}
											defaultValue={field.value}
											className="flex flex-col space-y-1"
										>
											<div className="flex items-center space-x-2">
												<RadioGroupItem
													value="GSTC Criteria"
													id="gstc-criteria"
												/>
												<Label htmlFor="gstc-criteria">GSTC Criteria</Label>
											</div>
											<div className="flex items-center space-x-2">
												<RadioGroupItem
													value="GSTC-Recognized Standard"
													id="gstc-recognized"
												/>
												<Label htmlFor="gstc-recognized">
													GSTC-Recognized Standard
												</Label>
											</div>
										</RadioGroup>
									</div>
								</FormItem>
							)}
						/>

						{/* Technical Scope */}
						<FormField
							control={form.control}
							name="technicalScope"
							render={() => (
								<FormItem className="grid grid-cols-[200px,1fr] items-start gap-4">
									<FormLabel className="text-left pt-2">
										Technical Scope
									</FormLabel>
									<div className="space-y-2">
										<FormField
											control={form.control}
											name="technicalScope"
											render={({ field }) => (
												<FormItem className="flex flex-col space-y-1">
													<div className="space-y-2">
														<div className="flex items-center space-x-2">
															<Checkbox
																checked={field.value?.includes(
																	"GSTC Hotel Criteria",
																)}
																onCheckedChange={(checked) => {
																	return checked
																		? field.onChange([
																				...field.value,
																				"GSTC Hotel Criteria",
																			])
																		: field.onChange(
																				field.value?.filter(
																					(value) =>
																						value !== "GSTC Hotel Criteria",
																				),
																			);
																}}
															/>
															<Label>GSTC Hotel Criteria</Label>
														</div>
														<div className="flex items-center space-x-2">
															<Checkbox
																checked={field.value?.includes(
																	"GSTC Tour Operator Criteria",
																)}
																onCheckedChange={(checked) => {
																	return checked
																		? field.onChange([
																				...field.value,
																				"GSTC Tour Operator Criteria",
																			])
																		: field.onChange(
																				field.value?.filter(
																					(value) =>
																						value !==
																						"GSTC Tour Operator Criteria",
																				),
																			);
																}}
															/>
															<Label>GSTC Tour Operator Criteria</Label>
														</div>
														<div className="flex items-center space-x-2">
															<Checkbox
																checked={field.value?.includes(
																	"GSTC Destination Criteria",
																)}
																onCheckedChange={(checked) => {
																	return checked
																		? field.onChange([
																				...field.value,
																				"GSTC Destination Criteria",
																			])
																		: field.onChange(
																				field.value?.filter(
																					(value) =>
																						value !==
																						"GSTC Destination Criteria",
																				),
																			);
																}}
															/>
															<Label>GSTC Destination Criteria</Label>
														</div>
													</div>
												</FormItem>
											)}
										/>
									</div>
								</FormItem>
							)}
						/>
					</div>
				</div>

				{/* Assessment Information Title */}
				<div className="bg-slate-100 p-3 top-0 z-10">
					<h2 className="text-lg font-semibold text-center">
						Assessment Information
					</h2>
				</div>

				{/* Assessment Information Content */}
				<div className="border rounded-md p-6">
					<div className="space-y-4">
						{/* Assessment Number */}
						<FormField
							control={form.control}
							name="assessmentNumber"
							render={({ field }) => (
								<FormItem className="grid grid-cols-[200px,1fr] items-center gap-4">
									<FormLabel className="text-left">Assessment Number</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						{/* Applicable Standards */}
						<FormField
							control={form.control}
							name="applicableStandards"
							render={({ field }) => (
								<FormItem className="grid grid-cols-[200px,1fr] items-center gap-4">
									<FormLabel className="text-left">
										Applicable Standards
									</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						{/* Time Frame */}
						<FormField
							control={form.control}
							name="timeframe"
							render={({ field }) => (
								<FormItem className="grid grid-cols-[200px,1fr] items-start gap-4">
									<FormLabel className="text-left pt-2">Time Frame</FormLabel>
									<div className="space-y-2">
										<RadioGroup
											onValueChange={field.onChange}
											defaultValue={field.value}
											className="flex flex-col space-y-1"
										>
											<div className="flex items-center space-x-2">
												<RadioGroupItem
													value="Short notice"
													id="short-notice"
												/>
												<Label htmlFor="short-notice">Short notice</Label>
											</div>
											<div className="flex items-center space-x-2">
												<RadioGroupItem value="Normal" id="normal" />
												<Label htmlFor="normal">Normal</Label>
											</div>
											<div className="flex items-center space-x-2">
												<RadioGroupItem value="Unannounced" id="unannounced" />
												<Label htmlFor="unannounced">Unannounced</Label>
											</div>
										</RadioGroup>
									</div>
								</FormItem>
							)}
						/>

						{/* Type */}
						<FormField
							control={form.control}
							name="type"
							render={({ field }) => (
								<FormItem className="grid grid-cols-[200px,1fr] items-start gap-4">
									<FormLabel className="text-left pt-2">Type</FormLabel>
									<div className="space-y-2">
										<div className="flex items-center space-x-2">
											<Checkbox
												checked={field.value?.includes("Desk Review")}
												onCheckedChange={(checked) => {
													return checked
														? field.onChange([...field.value, "Desk Review"])
														: field.onChange(
																field.value?.filter(
																	(value) => value !== "Desk Review",
																),
															);
												}}
											/>
											<Label>Desk Review</Label>
										</div>
										<div className="flex items-center space-x-2">
											<Checkbox
												checked={field.value?.includes("Head Office")}
												onCheckedChange={(checked) => {
													return checked
														? field.onChange([...field.value, "Head Office"])
														: field.onChange(
																field.value?.filter(
																	(value) => value !== "Head Office",
																),
															);
												}}
											/>
											<Label>Head Office</Label>
										</div>
										<div className="flex items-center space-x-2">
											<Checkbox
												checked={field.value?.includes("Affiliate Office")}
												onCheckedChange={(checked) => {
													return checked
														? field.onChange([
																...field.value,
																"Affiliate Office",
															])
														: field.onChange(
																field.value?.filter(
																	(value) => value !== "Affiliate Office",
																),
															);
												}}
											/>
											<Label>Affiliate Office</Label>
										</div>
										<div className="flex items-center space-x-2">
											<Checkbox
												checked={field.value?.includes("Witnessing")}
												onCheckedChange={(checked) => {
													return checked
														? field.onChange([...field.value, "Witnessing"])
														: field.onChange(
																field.value?.filter(
																	(value) => value !== "Witnessing",
																),
															);
												}}
											/>
											<Label>Witnessing</Label>
										</div>
									</div>
								</FormItem>
							)}
						/>

						{/* Technique */}
						<FormField
							control={form.control}
							name="technique"
							render={({ field }) => (
								<FormItem className="grid grid-cols-[200px,1fr] items-start gap-4">
									<FormLabel className="text-left pt-2">Technique</FormLabel>
									<div className="space-y-2">
										<div className="flex items-center space-x-2">
											<Checkbox
												checked={field.value?.includes("Fully on-site")}
												onCheckedChange={(checked) => {
													return checked
														? field.onChange([...field.value, "Fully on-site"])
														: field.onChange(
																field.value?.filter(
																	(value) => value !== "Fully on-site",
																),
															);
												}}
											/>
											<Label>Fully on-site</Label>
										</div>
										<div className="flex items-center space-x-2">
											<Checkbox
												checked={field.value?.includes("Fully remote")}
												onCheckedChange={(checked) => {
													return checked
														? field.onChange([...field.value, "Fully remote"])
														: field.onChange(
																field.value?.filter(
																	(value) => value !== "Fully remote",
																),
															);
												}}
											/>
											<Label>Fully remote</Label>
										</div>
										<div className="flex items-center space-x-2">
											<Checkbox
												checked={field.value?.includes(
													"Hybrid (remote and on-site)",
												)}
												onCheckedChange={(checked) => {
													return checked
														? field.onChange([
																...field.value,
																"Hybrid (remote and on-site)",
															])
														: field.onChange(
																field.value?.filter(
																	(value) =>
																		value !== "Hybrid (remote and on-site)",
																),
															);
												}}
											/>
											<Label>Hybrid (remote and on-site)</Label>
										</div>
										<div className="flex items-center space-x-2">
											<Checkbox
												checked={field.value?.includes(
													"Remote with facilitator on-site",
												)}
												onCheckedChange={(checked) => {
													return checked
														? field.onChange([
																...field.value,
																"Remote with facilitator on-site",
															])
														: field.onChange(
																field.value?.filter(
																	(value) =>
																		value !== "Remote with facilitator on-site",
																),
															);
												}}
											/>
											<Label>Remote with facilitator on-site</Label>
										</div>
									</div>
								</FormItem>
							)}
						/>

						{/* Planning */}
						<FormField
							control={form.control}
							name="planning"
							render={({ field }) => (
								<FormItem className="grid grid-cols-[200px,1fr] items-start gap-4">
									<FormLabel className="text-left pt-2">Planning</FormLabel>
									<div className="space-y-2">
										<RadioGroup
											onValueChange={field.onChange}
											defaultValue={field.value}
											className="flex flex-col space-y-1"
										>
											<div className="flex items-center space-x-2">
												<RadioGroupItem value="Regular" id="regular" />
												<Label htmlFor="regular">Regular</Label>
											</div>
											<div className="flex items-center space-x-2">
												<RadioGroupItem value="Extra" id="extra" />
												<Label htmlFor="extra">Extra</Label>
											</div>
										</RadioGroup>
									</div>
								</FormItem>
							)}
						/>

						{/* Assessment Purpose */}
						<FormField
							control={form.control}
							name="assessmentPurpose"
							render={({ field }) => (
								<FormItem className="grid grid-cols-[200px,1fr] items-center gap-4">
									<FormLabel className="text-left">
										Assessment Purpose
									</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
					</div>
				</div>
				{/* </div> */}

				<div className="flex justify-end space-x-2 bottom-0 bg-white py-4 border-t">
					<Button type="submit">Submit</Button>
				</div>
			</form>
		</Form>
	);
}

export default function AssessmentPage() {
	const [assessments, setAssessments] = useState<Assessment[]>([
		{
			id: "1",
			date: new Date().toISOString(),
			technicalScope: ["GSTC Hotel Criteria"],
			status: "Accredited",
			cbName: "Example CB",
			assessmentNumber: "ASS-001",
		},
		// ... other initial assessments
	]);
	const [dialogOpen, setDialogOpen] = useState(false);

	const addAssessment = (formData: z.infer<typeof formSchema>) => {
		const newAssessment: Assessment = {
			id: crypto.randomUUID(), // Generate unique ID
			date: new Date().toISOString(),
			technicalScope: formData.technicalScope,
			status: formData.cbStatus,
			cbName: formData.cbName,
			assessmentNumber: formData.assessmentNumber,
		};

		setAssessments((prev) => [...prev, newAssessment]);
	};

	return (
		<div className="container mx-auto py-10">
			<Card className="border-border/50">
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle>Assessments</CardTitle>
					<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
						<DialogTrigger asChild>
							<Button>
								<Plus className="mr-2 size-4" />
								Add Assessment
							</Button>
						</DialogTrigger>
						<DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
							<DialogHeader />
							<div className="flex-1 overflow-y-auto pr-6">
								<AssessmentForm
									onSubmit={addAssessment}
									onClose={() => setDialogOpen(false)}
								/>
							</div>
						</DialogContent>
					</Dialog>
				</CardHeader>
				<CardContent>
					<div className="relative w-full overflow-auto">
						<Table className="w-full border-collapse border-spacing-0">
							<TableHeader>
								<TableRow className="hover:bg-muted/50 data-[state=selected]:bg-muted">
									<TableHead className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
										Assessment Number
									</TableHead>
									<TableHead className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
										CB Name
									</TableHead>
									<TableHead className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
										Assessment Date
									</TableHead>
									<TableHead className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
										Technical Scope
									</TableHead>
									<TableHead className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
										Status
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{assessments.length === 0 ? (
									<TableRow>
										<TableCell
											colSpan={5}
											className="h-24 text-center text-muted-foreground"
										>
											No assessments found.
										</TableCell>
									</TableRow>
								) : (
									assessments.map((assessment) => (
										<TableRow
											key={assessment.id}
											className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors"
										>
											<TableCell className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
												{assessment.assessmentNumber}
											</TableCell>
											<TableCell className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
												{assessment.cbName}
											</TableCell>
											<TableCell className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
												{new Date(assessment.date).toLocaleDateString()}
											</TableCell>
											<TableCell className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
												<div className="flex flex-wrap gap-1">
													{assessment.technicalScope.map((scope) => (
														<span
															key={scope}
															className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground ring-1 ring-inset ring-muted-foreground/10"
														>
															{scope}
														</span>
													))}
												</div>
											</TableCell>
											<TableCell className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
												<span
													className={cn(
														"inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset",
														assessment.status === "Accredited"
															? "bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-400/10 dark:text-green-400 dark:ring-green-400/20"
															: "bg-yellow-50 text-yellow-700 ring-yellow-600/20 dark:bg-yellow-400/10 dark:text-yellow-400 dark:ring-yellow-400/20"
													)}
												>
													{assessment.status}
												</span>
											</TableCell>
										</TableRow>
									))
								)}
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

class CourseItem {
	constructor(name, course, type, description, requirementsText, percentageWorth, dueDate, status) {
		this.name = name,
		this.course = course,
		this.type = type,
		this.description = description,
		this.requirementsText = requirementsText,
		this.percentageWorth = percentageWorth,
		this.dueDate = dueDate,
		this.status = status; // this will be updated by either the user or by prompting the AI for update
	}
}
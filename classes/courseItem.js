class CourseItem {
	constructor(name, courseName, description, requirementsText, percentageWorth, dueDate, state) {
		this.name = name,
		this.courseName = courseName,
		this.description = description,
		this.requirementsText = requirementsText,
		this.percentageWorth = percentageWorth,
		this.dueDate = dueDate,
		this.state = state; // this will be updated by either the user or by prompting the AI for update
	}
}
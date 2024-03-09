// Define the Course class
class Course {
	constructor(name, description, credit, professor, state, breakdownActivities, courseItems) {
			this.name = name;
			this.description = description;
			this.credit = credit; // number of credits this course is worth
			this.professor = professor;
			this.state = state; // completion status of this course? InProgress or Completed
			// Could just contain objects of Assignments, Quizzes, Labs, Exams
			this.breakdownActivites = breakdownActivities;
			// Each object in this is of the format
			// {
			// 	type: "Assignments";
			// 	percentage: 10;
			// }
			this.courseItemTypes = extractTypesCourseItems(breakdownItems);
			this.courseItems = courseItems; 
	}

	addCourseItem(name, type, description, requirementText, percentageWorth, dueDate, state) {
		this.courseItems.push(new CourseItem(name, this.name, type, description, requirementText, percentageWorth, dueDate, state));
	}
}

function extractTypesCourseItems(courseItems) {
	return courseItems.map(item => {
			let type = item.type;
			// Remove 's' if it exists
			if (type.endsWith('s')) {
					type = type.slice(0, -1);
			}
			return type;
	});
}

// Export the Course class
module.exports = Course;
export interface IServicelocator {
  getAllCourse(
    subject: [string],
    audience: [string],
    className: [string],
    medium: [string],
    limit: string,
    request: any
  );

  getAllCoursesByCourseIds(courseIds: [string], request: any);
  getOneCourse(courseId: string, request: any);
}

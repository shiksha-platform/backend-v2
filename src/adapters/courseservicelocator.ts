export interface IServicelocator {
  getAllCourse(
    subject: [string],
    audience: [string],
    className: [string],
    medium: [string],
    limit: string,
    request: any
  );

  getCoursesByIds(courseIds: [string], request: any);
  getCourseDetail(courseId: string, request: any);
}

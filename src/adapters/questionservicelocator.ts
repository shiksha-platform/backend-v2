export interface IServicelocator {
  getAllQuestions(
    questionType: string,
    subject: [string],
    limit: string,
    language: string,
    medium: string,
    bloomsLevel: [string],
    topic: [string],
    className: [string],
    request: any
  );
  getAllQuestionsByQuestionIds(questionIds: [string], request: any);
  getSubjectList(gradeLevel: string);
  getTopicsList(subject: string);
  getCompetenciesList(subject: string, limit: string, request: any);
  getOneQuestion(questionId: string, request: any);
  getQuestion(questionId, request);
  createQuestion(request, questionDto);
  updateQuestion(questionId, request, questionDto);
  filterQuestion(
    limit: string,
    body: string,
    className: string,
    maxScore: string,
    questionId: string,
    subject: string,
    topic: string,
    type: string,
    page: number,
    request: any
  );

  bulkImport(request: any, questionDto: [Object]);
}

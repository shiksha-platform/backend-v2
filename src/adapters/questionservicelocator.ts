export interface IServicelocator {
  getAllQuestions(
    questionType: string,
    subject: string,
    limit: string,
    language: string,
    medium: string,
    bloomsLevel: string,
    request: any
  );
  getAllQuestionsByQuestionIds(questionIds: [string], request: any);
  getSubjectList();
  getcompetenciesList(subject: string, limit: string, request: any);
  getOneQuestion(questionId: string, request: any);
}

import { QuestionForm } from "@/components/forms";

const AskQuestion = () => {
  return (
    <div>
      <h1 className="text-dark-100_light-850 text-3xl font-semibold">
        Ask a Question
      </h1>
      <div className="mt-8">
        <QuestionForm />
      </div>
    </div>
  );
};

export default AskQuestion;

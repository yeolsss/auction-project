import connectSupabase from "./connectSupabase";
import { Auction_answer, Auction_question } from "../types/databaseReturnTypes";

export const fetchPostQuestion = async (
  questionData: Pick<Auction_question, "user_id" | "auction_id" | "question">
) => {
  const { error } = await connectSupabase
    .from("auction_question")
    .insert(questionData)
    .select();
  if (error) throw error;
};

export const fetchGetQuestions = async (auction_id: string) => {
  const { data, error } = await connectSupabase
    .from("auction_question")
    .select("*, user_info(*), auction_answer(*, user_info(*))")
    .eq("auction_id", auction_id)
    .order("created_at", { ascending: false })
    .returns<Auction_question[]>();

  if (error) throw error;

  return data;
};

export const fetchDeleteQuestion = async (auction_question_id: string) => {
  const { error } = await connectSupabase
    .from("auction_question")
    .delete()
    .eq("auction_question_id", auction_question_id);

  if (error) throw error;
};

export const fetchUpdateQuestion = async (
  question: Pick<Auction_question, "question" | "auction_question_id">
) => {
  const { data, error } = await connectSupabase
    .from("auction_question")
    .update(question)
    .eq("auction_question_id", question.auction_question_id)
    .select();

  if (error) throw error;

  return data;
};

export const fetchPostAnswer = async (
  answerData: Pick<Auction_answer, "user_id" | "auction_question_id" | "answer">
) => {
  const { error } = await connectSupabase
    .from("auction_answer")
    .insert(answerData)
    .select();
  if (error) throw error;
};

export const fetchDeleteAnswer = async (auction_answer_id: string) => {
  const { error } = await connectSupabase
    .from("auction_answer")
    .delete()
    .eq("auction_answer_id", auction_answer_id);

  if (error) throw error;
};

export const fetchUpdateAnswer = async (
  answer: Pick<Auction_answer, "answer" | "auction_answer_id">
) => {
  const { data, error } = await connectSupabase
    .from("auction_answer")
    .update(answer)
    .eq("auction_answer_id", answer.auction_answer_id)
    .select();

  if (error) throw error;

  return data;
};

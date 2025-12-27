"use client"

/**
 * Simple CAPTCHA implementation
 * For production, consider using Google reCAPTCHA or hCaptcha
 */

export interface CaptchaChallenge {
  question: string
  answer: number
}

export function generateCaptcha(): CaptchaChallenge {
  const num1 = Math.floor(Math.random() * 10) + 1
  const num2 = Math.floor(Math.random() * 10) + 1
  const operators = ["+", "-", "×"]
  const operator = operators[Math.floor(Math.random() * operators.length)]

  let answer: number
  let question: string

  switch (operator) {
    case "+":
      answer = num1 + num2
      question = `${num1} + ${num2} = ?`
      break
    case "-":
      answer = num1 - num2
      question = `${num1} - ${num2} = ?`
      break
    case "×":
      answer = num1 * num2
      question = `${num1} × ${num2} = ?`
      break
    default:
      answer = num1 + num2
      question = `${num1} + ${num2} = ?`
  }

  return { question, answer }
}

export function verifyCaptcha(userAnswer: string, correctAnswer: number): boolean {
  return Number.parseInt(userAnswer) === correctAnswer
}

//create object with question, 4 options, and correct answer

function Question(question, option1, option2,option3,option4, answer){
    this.myQuestion = question;
    this.op1 = option1;
    this.op2 = option2;
    this.op3 = option3;
    this.op4 = option4;
    this.correctAns = answer;
}
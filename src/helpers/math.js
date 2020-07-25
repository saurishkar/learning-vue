import { operators } from "@/constants/defaults";

const { add, sub, mul, div } = operators;

const MathHelper = {
  evalExp: ({ operand1, operand2, operator = add.id }) => {
    operand1 = parseFloat(operand1);
    operand2 = parseFloat(operand2);
    switch(operator) {
      case add.id: return operand1 + operand2;

      case sub.id: return operand1 - operand2;

      case mul.id: return operand1 * operand2;

      case div.id: return operand1 / operand2;
    }
  }
}

export const { evalExp } = MathHelper;

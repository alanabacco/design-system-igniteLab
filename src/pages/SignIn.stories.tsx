import { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, waitFor } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { rest } from "msw";
import { SignIn } from "./SignIn";

export default {
  title: "Pages/Sign In",
  component: SignIn,
  args: {},
  argTypes: {},
  parameters: {
    msw: {
      handlers: [
        rest.post("/sessions", (request, response, context) => {
          return response(
            context.json({
              message: "Login realizado!",
            })
          );
        }),
      ],
    },
  },
} as Meta;

// exemplo de como integrar testes no storybook
export const Default: StoryObj = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    userEvent.type(
      canvas.getByPlaceholderText("Digite seu e-mail"),
      "alana_bacco@hotmail.com"
    );
    userEvent.type(canvas.getByPlaceholderText("********"), "01010101");

    userEvent.click(canvas.getByRole("button"));

    await waitFor(() => {
      expect(canvas.getByText("Login realizado!")).toBeVisible();
    });
  },
};

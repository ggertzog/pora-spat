import type { Preview } from "@storybook/react";
import { CygreFont, VelaSansFont } from "../../src/app/_fonts";
import "../../src/core/styles/globals.scss";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => {
      const [queryClient] = React.useState(
        () =>
          new QueryClient({
            defaultOptions: {
              queries: {
                retry: false,
              },
            },
          })
      );

      React.useEffect(() => {
        // Применяем классы шрифтов к html элементу для глобального доступа к CSS переменным
        const htmlElement = document.documentElement;
        htmlElement.classList.add(CygreFont.variable);
        htmlElement.classList.add(VelaSansFont.variable); 

        return () => {
          htmlElement.classList.remove(CygreFont.variable);
          htmlElement.classList.remove(VelaSansFont.variable);
        };
      }, []);

      return (
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      );
    },
  ],
};

export default preview;

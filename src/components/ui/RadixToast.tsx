import * as Toast from '@radix-ui/react-toast';

export  const ToastComponent = () => (
  <Toast.Provider>
    <Toast.Root>
      <Toast.Title />
      <Toast.Description />
      <Toast.Action altText='bhajsd' />
      <Toast.Close />
    </Toast.Root>

    <Toast.Viewport />
  </Toast.Provider>
);
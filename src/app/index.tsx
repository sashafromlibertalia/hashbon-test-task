import "./index.scss";
import { ChatWidget } from "~/widgets/chat";
import s from "../pages/root/RootPage.module.scss";

const App = () => {
  return (
    <main className={s.preview}>
      <ChatWidget />
    </main>
  );
};

export default App;

import { useChat } from "ai/react";

const SplashPage = () => {
  const { messages, handleSubmit, input, handleInputChange } = useChat();

  console.log("messages", messages);

  return (
    <form onSubmit={handleSubmit}>
      <label>Prompt</label>
      <input
        name="prompt"
        value={input}
        onChange={handleInputChange}
        id="input"
      />
      <button type="submit">Submit</button>
      {messages.map((message, i) => (
        <div key={i}>{message.content}</div>
      ))}
    </form>
  );
};

export default SplashPage;

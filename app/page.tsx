const page = () => {
  return (
    <div>
      FirstPage
      <p>{process.env.CLERK_WEBHOOK_SECRET}</p>
      <p>{process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}</p>
      <p>{process.env.MONGODB_URL}</p>
    </div>
  );
};

export default page;

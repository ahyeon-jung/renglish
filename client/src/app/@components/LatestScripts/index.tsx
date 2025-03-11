import Container from "../Container";

export default function LatestScript() {
  return (
    <Container label="Latest Script">
      <div className="flex flex-col bg-gray-300 p-4 rounded-xl">
        <div>타이틀</div>
        <div>별점</div>
      </div>
      <div>이미지</div>
    </Container>
  );
}

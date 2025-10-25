class NetworkService {
  public async sendSessionId(sessionId: string): Promise<void> {
    const response = await fetch("http://localhost:8080/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionId: sessionId }),
    });
  }
}

export default new NetworkService();

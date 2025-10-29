export class ErrorHandler {
  static handle(error: unknown): void {
    const timestamp = new Date().toISOString();

    if (error instanceof Error) {
      console.error(`[ERROR] ${timestamp} - ${error.name}: ${error.message}`);
      console.error(error.stack);
    } else {
      console.error(`[ERROR] ${timestamp} - ${String(error)}`);
    }
  }
}

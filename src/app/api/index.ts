import SampleUsers from "@/samples/users.json";
import User from "@/types/user";

declare global {
  var SAMPLE_USER: User[];
}

if (!global.SAMPLE_USER) {
  global.SAMPLE_USER = [...(SampleUsers as User[])];
}

export const SAMPLE_USER: User[] = global.SAMPLE_USER;

export function reset(): void {
  const newData = SampleUsers as User[];
  global.SAMPLE_USER = [...newData];
}

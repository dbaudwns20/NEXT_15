import { NextRequest, NextResponse } from "next/server";

import User from "@/types/user";

export async function DELETE(request: NextRequest, { params }: { params: { userId: number } }) {
  try {
    const { userId } = await params;

    const targetIndex: number = SAMPLE_USER.findIndex((user: User) => user.id === Number(userId));
    if (targetIndex === -1) {
      throw new Error("User not found");
    }

    SAMPLE_USER.splice(targetIndex, 1);
    
    return NextResponse.json({message: "deleted"}, {status: 200});
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
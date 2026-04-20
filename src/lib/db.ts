/**
 * DB mock en memoria — MVP test.
 * Se reemplaza por Neon (@neondatabase/serverless) al deploy.
 * Los datos se pierden al reiniciar el server dev. Es intencional.
 */

import type { User } from "./types";

interface UserRow extends User {
  createdAt: number;
  lastSeenAt: number;
}

const users = new Map<string, UserRow>(); // key = email (lowercase)

export function createOrUpdateUser(input: {
  name: string;
  email: string;
  visitDate: string;
  locale: User["locale"];
}): UserRow {
  const key = input.email.toLowerCase().trim();
  const existing = users.get(key);
  const now = Date.now();

  if (existing) {
    const updated: UserRow = {
      ...existing,
      name: input.name.trim().slice(0, 100),
      visitDate: input.visitDate,
      locale: input.locale,
      lastSeenAt: now,
    };
    users.set(key, updated);
    return updated;
  }

  const id = users.size + 1;
  const created: UserRow = {
    id,
    name: input.name.trim().slice(0, 100),
    email: key,
    visitDate: input.visitDate,
    locale: input.locale,
    createdAt: now,
    lastSeenAt: now,
  };
  users.set(key, created);
  return created;
}

export function getUserByEmail(email: string): UserRow | null {
  return users.get(email.toLowerCase().trim()) ?? null;
}

export function getUserById(id: number): UserRow | null {
  for (const u of users.values()) {
    if (u.id === id) return u;
  }
  return null;
}

export function deleteUserByEmail(email: string): boolean {
  return users.delete(email.toLowerCase().trim());
}

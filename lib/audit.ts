import { prisma } from './prisma';

interface LogOptions {
  userId?: string | null;
  userName?: string | null;
  action: string;
  entityType: string;
  entityId?: string | null;
  details?: any;
  ipAddress?: string | null;
  userAgent?: string | null;
}

export async function createAuditLog(options: LogOptions) {
  try {
    return await prisma.auditLog.create({
      data: {
        userId: options.userId || null,
        userName: options.userName || null,
        action: options.action,
        entityType: options.entityType,
        entityId: options.entityId ? String(options.entityId) : null,
        detailsJson: options.details ? JSON.stringify(options.details) : null,
        ipAddress: options.ipAddress || null,
        userAgent: options.userAgent || null,
      },
    });
  } catch (err) {
    console.error('Failed to create audit log:', err);
    return null;
  }
}

import { NextResponse } from 'next/server'

/**
 * Migration route is no longer applicable.
 * All data collections were migrated to the Pages block-based architecture.
 * To add content, use the PayloadCMS admin panel at /admin.
 */
export async function GET() {
  return NextResponse.json(
    {
      message:
        'Migration is no longer needed. All content is managed via the Pages collection in the PayloadCMS admin panel.',
    },
    { status: 410 },
  )
}

import { createFileRoute } from '@tanstack/react-router';
import { ArchitecturalNotFound } from '@/components/site/layout';
import { pageHead } from '@/data/company';
export const Route=createFileRoute('/404')({head:()=>pageHead('Space Not Found','The space you are looking for does not exist here. Return to Jentora.'),component:ArchitecturalNotFound});

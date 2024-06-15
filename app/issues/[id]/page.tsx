import prisma from '@/prisma/client';
import { Metadata } from 'next';
import DetailsPageView from './DetailsPageView';
import { auth } from '@/auth';


// Server component to fetch and display issue details
const IssueDetailPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const sessionData = await auth();

  return (
    <DetailsPageView id={id} session={sessionData} />
  );
};

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const issue = await prisma.issue.findUnique({
    where: { id: params.id }
  });

  return {
    title: issue?.title ?? 'Issue Details',
    description: 'View issue details'+ issue?.title ?? 'Issue Details',
  };
}

export default IssueDetailPage;

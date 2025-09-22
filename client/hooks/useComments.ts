import { useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useWorkspaceContext } from '@/contexts/WorkspaceContext';
import { CommentService, CommentType } from '@/services/api/commentService';
import { queryKeys } from '@/query/queryKeys';

export function useComments() {
  const { currentWorkspaceId } = useWorkspaceContext();
  const queryClient = useQueryClient();

  const commentsQuery = useQuery({
    queryKey: queryKeys.comments.all(currentWorkspaceId),
    queryFn: () => CommentService.list(currentWorkspaceId),
    staleTime: 0,
    refetchOnMount: true,
    placeholderData: (prev) => prev
  });

  const createMutation = useMutation({
    mutationFn: (text: string) => CommentService.create(currentWorkspaceId, text),
    onSuccess: (newComment) => {
      queryClient.setQueryData<CommentType[]>(
        queryKeys.comments.all(currentWorkspaceId),
        (old) => old ? [newComment, ...old] : [newComment]
      );
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (commentId: string) => CommentService.delete(currentWorkspaceId, commentId),
    onSuccess: (_, id) => {
      queryClient.setQueryData<CommentType[]>(
        queryKeys.comments.all(currentWorkspaceId),
        (old) => old ? old.filter(c => c.id !== id) : []
      );
    }
  });

  const createComment = useCallback((text: string) => { createMutation.mutate(text); }, [createMutation]);
  const deleteComment = useCallback((id: string) => { deleteMutation.mutate(id); }, [deleteMutation]);
  const refresh = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: queryKeys.comments.all(currentWorkspaceId) });
  }, [currentWorkspaceId, queryClient]);

  return {
    comments: commentsQuery.data || [],
    isLoading: commentsQuery.isLoading,
    isRefetching: commentsQuery.isRefetching,
    isError: commentsQuery.isError,
    error: commentsQuery.error,
    createComment,
    deleteComment,
    isCreating: createMutation.isPending,
    isDeleting: deleteMutation.isPending,
    refresh
  };
}



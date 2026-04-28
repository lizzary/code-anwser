import {useState} from 'react';

function CommentForm({postId}) {
    const [authorName, setAuthorName] = useState('');
    const [body, setBody] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        if (!authorName.trim() || !body.trim()) {
            setError('Please fill out both fields.');
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await fetch('/api/comments', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    post_id: postId,
                    author_name: authorName,
                    body: body,
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to submit comment');
            }

            setSuccess(true);
            setAuthorName('');
            setBody('');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Leave a Comment</h3>

            {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded">
                    {error}
                </div>
            )}

            {success && (
                <div className="mb-4 p-3 bg-green-50 text-green-700 border border-green-200 rounded">
                    Comment submitted successfully!
                </div>
            )}

            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                </label>
                <input                    type="text"
                    id="name"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your name"
                    disabled={isSubmitting}
                />
            </div>

            <div className="mb-4">
                <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">
                    Comment
                </label>
                <textarea                    id="body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Write your comment..."
                    disabled={isSubmitting}
                />
            </div>

            <button                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                {isSubmitting ? 'Submitting...' : 'Submit Comment'}
            </button>
        </form>
    );
}
export default CommentForm;
import React from 'react';

const Table = ({posts}) => {
    return (
        <tr id={posts.id}>
            <td>
                {posts.column}
            </td>
            <td>
                {posts.type}
            </td>
        </tr>
    );
}

export default Table;
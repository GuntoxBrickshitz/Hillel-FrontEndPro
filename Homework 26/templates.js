export const viewTemplate = `<form id="newUserForm" class="form">
<table class="u-full-width">
    <thead>
        <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody id="usersList"></tbody>
    <tfoot>
        <tr>
            <td>
                <input
                    type="hidden"
                    name="id"
                    id="idInput"
                    class="form-input"
                />
                <input
                    type="text"
                    name="name"
                    id="nameInput"
                    class="form-input"
                />
            </td>
            <td>
                <input
                    type="text"
                    name="surname"
                    id="surnameInput"
                    class="form-input"
                />
            </td>
            <td>
                <input
                    type="text"
                    name="email"
                    id="emailInput"
                    class="form-input"
                />
            </td>
            <td><button id="saveUserBtn">Save</button></td>
        </tr>
    </tfoot>
</table>
</form>`;

export const itemTemplate = `<tr class="user-item" data-id="{{id}}">
<td>{{name}}</td>
<td>{{surname}}</td>
<td>{{email}}</td>
<td>
    <button type="button" class="delete-btn">Delete</button>
    <button type="button" class="edit-btn">Edit</button>
</td>
</tr>`;

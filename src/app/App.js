
import React, { Component } from 'react';

class App extends Component {

    constructor() {
        super();
        this.state = {
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            users: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.editUsers = this.editUsers.bind(this);
        this.addUsers = this.addUsers.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers() {
        fetch('/api/users')
            .then(res => res.json())
            .then(data => {
                this.setState({users: data});
            });
    }

    fetchUserById(id) {
        fetch(`/api/users/${id}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    id: data.id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phone: data.phone,
                })
            })
    }

    editUsers(e) {
        e.preventDefault();
        fetch(`/api/users/${this.state.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                phone: this.state.phone,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    id: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                });
                const close = document.getElementById('btnClose');
                close.click();
                this.fetchUsers();
            });
    }

    addUsers(e) {
        e.preventDefault();
        fetch(`/api/users/`, {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    id: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                });
                this.fetchUsers();
            });
    }

    deleteUserById(id) {
        fetch(`/api/users/${id}`, {
            method: 'DELETE',
            body: JSON.stringify({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                phone: this.state.phone,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                this.fetchUsers();
            });
    }


    render() {
        return (
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Email</th>
                        <th scope="col">Telefono</th>
                        <th scope="col">Acciones</th>
                    </tr>
                    </thead>
                    <tbody>

                        {this.state.users.map((elem) => (
                            <tr key={elem.id}>
                                <td>{elem.firstName}</td>
                                <td>{elem.lastName}</td>
                                <td>{elem.email}</td>
                                <td>{elem.phone}</td>
                                <td>
                                    <button onClick={() => this.fetchUserById(elem.id)} type="button" className="btn btn-dark" style={{margin: '4px'}}  data-bs-toggle="modal" data-bs-target="#usersModal">
                                        <i className="bi bi-pencil-square"> Editar</i>
                                    </button>
                                    <button onClick={() => this.deleteUserById(elem.id)} type="button" className="btn btn-danger" >
                                        <i className="bi bi-trash"> Borrar</i>
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Agregar Usuario</h5>
                        <form onSubmit={this.addUsers}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="firstName" className="form-label">Nombre</label>
                                    <input name="firstName" type="text" className="form-control" id="firstName" value={this.state.firstName} onChange={this.handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="lastName" className="form-label">Apellido</label>
                                    <input name="lastName" type="text" className="form-control" id="lastName" value={this.state.lastName} onChange={this.handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input name="email" type="email" className="form-control" id="email" value={this.state.email} onChange={this.handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">Telefono</label>
                                    <input name="phone" type="text" className="form-control" id="phone" value={this.state.phone} onChange={this.handleChange} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary" id="btnEdit" >Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
                 {/*Modal */}
                <div className="modal fade" id="usersModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Editar Usuario</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <form onSubmit={this.editUsers}>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label htmlFor="firstName" className="form-label">Nombre</label>
                                        <input name="firstName" type="text" className="form-control" id="firstName" value={this.state.firstName} onChange={this.handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="lastName" className="form-label">Apellido</label>
                                        <input name="lastName" type="text" className="form-control" id="lastName" value={this.state.lastName} onChange={this.handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input name="email" type="email" className="form-control" id="email" value={this.state.email} onChange={this.handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="phone" className="form-label">Telefono</label>
                                        <input name="phone" type="text" className="form-control" id="phone" value={this.state.phone} onChange={this.handleChange} />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id="btnClose">Cerrar</button>
                                    <button type="submit" className="btn btn-primary" id="btnEdit" >Guardar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default App;

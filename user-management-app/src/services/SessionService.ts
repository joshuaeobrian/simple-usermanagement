const BASE_URL = "/api/v1/session";

class SessionService {
    check() {
        const local = localStorage.getItem("session");
        if (local) {
            return JSON.parse(local);
        }
    }

    create(email: string, password: string) {
        return fetch(BASE_URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        }).then(rs => {
            const session = rs.json();
            session.then(s => SessionService.saveSessionLocally(s))

            return session;
        })
    }

    static saveSessionLocally(session: any) {
        localStorage.setItem("session", JSON.stringify(session))
    }

    clearSession() {
        localStorage.clear()
    }
}

export default new SessionService();

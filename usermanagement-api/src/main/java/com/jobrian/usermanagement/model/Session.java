package com.jobrian.usermanagement.model;

public class Session {
    private String session;
    private Object user;

    public Session(String session, Object user) {
        this.session = session;
        this.user = user;
    }

    public String getSession() {
        return session;
    }

    public void setSession(String session) {
        this.session = session;
    }

    public Object getUser() {
        return user;
    }

    public void setUser(Object user) {
        this.user = user;
    }
}
